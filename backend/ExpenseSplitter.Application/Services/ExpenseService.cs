using ExpenseSplitter.Application.DTOs;
using ExpenseSplitter.Application.Interfaces;
using ExpenseSplitter.Domain.Entities;
using ExpenseSplitter.Domain.Interfaces;

namespace ExpenseSplitter.Application.Services;

public class ExpenseService : IExpenseService
{
    private readonly IExpenseRepository _expenseRepository;
    private readonly IGroupRepository _groupRepository;

    public ExpenseService(IExpenseRepository expenseRepository, IGroupRepository groupRepository)
    {
        _expenseRepository = expenseRepository;
        _groupRepository = groupRepository;
    }

    public async Task<ExpenseResponse> AddExpenseAsync(Guid groupId, CreateExpenseRequest request)
    {
        var expense = new Expense(request.Description, request.Amount, request.PaidByMemberId, groupId);
        expense.SplitEqually(request.SplitBetweenMemberIds);

        await _expenseRepository.AddAsync(expense);
        await _expenseRepository.SaveChangesAsync();

        return new ExpenseResponse(expense.Id, expense.Description, expense.Amount, expense.PaidByMemberId, expense.CreatedAt);
    }

    public async Task<List<BalanceResponse>> GetBalancesAsync(Guid groupId)
    {
        var group = await _groupRepository.GetByIdWithDetailsAsync(groupId)
            ?? throw new KeyNotFoundException("Group not found.");

        // Start everyone at zero
        var balances = group.Members.ToDictionary(m => m.Id, m => 0m);

        foreach (var expense in group.Expenses)
        {
            // Payer gets credited the full amount they paid
            balances[expense.PaidByMemberId] += expense.Amount;

            // Everyone who owes a share gets debited their share
            foreach (var share in expense.Shares)
                balances[share.MemberId] -= share.ShareAmount;
        }

        return group.Members
            .Select(m => new BalanceResponse(m.Id, m.Name, Math.Round(balances[m.Id], 2)))
            .ToList();
    }

    public async Task<List<SettlementResponse>> GetSettlementsAsync(Guid groupId)
    {
        var group = await _groupRepository.GetByIdWithDetailsAsync(groupId)
            ?? throw new KeyNotFoundException("Group not found.");

        var balances = await GetBalancesAsync(groupId);

        // Split into creditors (positive balance, owed money) and debtors (negative, owe money)
        var creditors = balances.Where(b => b.NetBalance > 0).OrderByDescending(b => b.NetBalance).ToList();
        var debtors = balances.Where(b => b.NetBalance < 0).OrderBy(b => b.NetBalance).ToList();

        var settlements = new List<SettlementResponse>();
        int i = 0, j = 0;

        while (i < debtors.Count && j < creditors.Count)
        {
            var debtor = debtors[i];
            var creditor = creditors[j];

            var settleAmount = Math.Min(-debtor.NetBalance, creditor.NetBalance);
            settleAmount = Math.Round(settleAmount, 2);

            if (settleAmount > 0)
            {
                settlements.Add(new SettlementResponse(
                    debtor.MemberId, debtor.MemberName,
                    creditor.MemberId, creditor.MemberName,
                    settleAmount));
            }

            debtor = debtor with { NetBalance = debtor.NetBalance + settleAmount };
            creditor = creditor with { NetBalance = creditor.NetBalance - settleAmount };

            debtors[i] = debtor;
            creditors[j] = creditor;

            if (Math.Abs(debtor.NetBalance) < 0.01m) i++;
            if (Math.Abs(creditor.NetBalance) < 0.01m) j++;
        }

        return settlements;
    }
}