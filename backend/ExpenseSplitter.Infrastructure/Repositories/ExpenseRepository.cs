using ExpenseSplitter.Domain.Entities;
using ExpenseSplitter.Domain.Interfaces;
using ExpenseSplitter.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ExpenseSplitter.Infrastructure.Repositories;

public class ExpenseRepository : IExpenseRepository
{
    private readonly AppDbContext _context;

    public ExpenseRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Expense?> GetByIdAsync(Guid id)
    {
        return await _context.Expenses
            .Include(e => e.Shares)
            .FirstOrDefaultAsync(e => e.Id == id);
    }

    public async Task<List<Expense>> GetByGroupIdAsync(Guid groupId)
    {
        return await _context.Expenses
            .Include(e => e.Shares)
            .Where(e => e.GroupId == groupId)
            .ToListAsync();
    }

    public async Task AddAsync(Expense expense)
    {
        await _context.Expenses.AddAsync(expense);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}