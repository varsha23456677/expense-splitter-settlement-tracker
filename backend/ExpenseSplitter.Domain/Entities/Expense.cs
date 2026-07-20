namespace ExpenseSplitter.Domain.Entities;

public class Expense
{
    public Guid Id { get; private set; }
    public string Description { get; private set; }
    public decimal Amount { get; private set; }
    public Guid PaidByMemberId { get; private set; }
    public Guid GroupId { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public List<ExpenseShare> Shares { get; private set; } = new();

    private Expense() { }

    public Expense(string description, decimal amount, Guid paidByMemberId, Guid groupId)
    {
        if (amount <= 0)
            throw new ArgumentException("Expense amount must be greater than zero.");

        Id = Guid.NewGuid();
        Description = description;
        Amount = amount;
        PaidByMemberId = paidByMemberId;
        GroupId = groupId;
        CreatedAt = DateTime.UtcNow;
    }

    public void SplitEqually(List<Guid> memberIds)
    {
        if (memberIds.Count == 0)
            throw new ArgumentException("At least one member must be involved.");

        var shareAmount = Math.Round(Amount / memberIds.Count, 2);
        Shares.Clear();

        foreach (var memberId in memberIds)
            Shares.Add(new ExpenseShare(Id, memberId, shareAmount));
    }
}