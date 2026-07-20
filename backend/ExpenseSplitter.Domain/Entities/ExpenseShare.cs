namespace ExpenseSplitter.Domain.Entities;

public class ExpenseShare
{
    public Guid Id { get; private set; }
    public Guid ExpenseId { get; private set; }
    public Guid MemberId { get; private set; }
    public decimal ShareAmount { get; private set; }

    private ExpenseShare() { }

    public ExpenseShare(Guid expenseId, Guid memberId, decimal shareAmount)
    {
        Id = Guid.NewGuid();
        ExpenseId = expenseId;
        MemberId = memberId;
        ShareAmount = shareAmount;
    }
}