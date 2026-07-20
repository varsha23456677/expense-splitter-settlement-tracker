using ExpenseSplitter.Application.DTOs;

namespace ExpenseSplitter.Application.Interfaces;

public interface IExpenseService
{
    Task<ExpenseResponse> AddExpenseAsync(Guid groupId, CreateExpenseRequest request);
    Task<List<BalanceResponse>> GetBalancesAsync(Guid groupId);
    Task<List<SettlementResponse>> GetSettlementsAsync(Guid groupId);
}