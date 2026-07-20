namespace ExpenseSplitter.Domain.Entities;

public class Group
{
    public Guid Id { get; private set; }
    public string Name { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public List<Member> Members { get; private set; } = new();
    public List<Expense> Expenses { get; private set; } = new();

    // Private constructor for EF Core
    private Group() { }

    public Group(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Group name cannot be empty.");

        Id = Guid.NewGuid();
        Name = name;
        CreatedAt = DateTime.UtcNow;
    }

    public void AddMember(Member member)
    {
        if (Members.Any(m => m.Name == member.Name))
            throw new InvalidOperationException("A member with this name already exists in the group.");

        Members.Add(member);
    }
}