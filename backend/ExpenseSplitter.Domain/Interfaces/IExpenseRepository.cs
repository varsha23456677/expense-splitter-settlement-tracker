using ExpenseSplitter.Domain.Entities;

namespace ExpenseSplitter.Domain.Interfaces;

public interface IExpenseRepository
{
    Task<Expense?> GetByIdAsync(Guid id);
    Task<List<Expense>> GetByGroupIdAsync(Guid groupId);
    Task AddAsync(Expense expense);
    Task SaveChangesAsync();
}