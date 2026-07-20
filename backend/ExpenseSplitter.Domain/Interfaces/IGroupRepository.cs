using ExpenseSplitter.Domain.Entities;

namespace ExpenseSplitter.Domain.Interfaces;

public interface IGroupRepository
{
    Task<Group?> GetByIdAsync(Guid id);
    Task<Group?> GetByIdWithDetailsAsync(Guid id); // includes Members + Expenses
    Task<List<Group>> GetAllAsync();
    Task AddAsync(Group group);
    Task SaveChangesAsync();
}