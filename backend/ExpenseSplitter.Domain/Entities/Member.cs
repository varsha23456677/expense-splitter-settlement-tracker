namespace ExpenseSplitter.Domain.Entities;

public class Member
{
    public Guid Id { get; private set; }
    public string Name { get; private set; }
    public Guid GroupId { get; private set; }

    private Member() { }

    public Member(string name, Guid groupId)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Member name cannot be empty.");

        Id = Guid.NewGuid();
        Name = name;
        GroupId = groupId;
    }
}