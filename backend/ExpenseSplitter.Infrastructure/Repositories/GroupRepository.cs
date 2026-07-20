using ExpenseSplitter.Domain.Entities;
using ExpenseSplitter.Domain.Interfaces;
using ExpenseSplitter.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ExpenseSplitter.Infrastructure.Repositories;

public class GroupRepository : IGroupRepository
{
    private readonly AppDbContext _context;

    public GroupRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Group?> GetByIdAsync(Guid id)
    {
        return await _context.Groups.FindAsync(id);
    }

    public async Task<Group?> GetByIdWithDetailsAsync(Guid id)
    {
        return await _context.Groups
            .Include(g => g.Members)
            .Include(g => g.Expenses)
                .ThenInclude(e => e.Shares)
            .FirstOrDefaultAsync(g => g.Id == id);
    }

    public async Task<List<Group>> GetAllAsync()
    {
        return await _context.Groups.ToListAsync();
    }

    public async Task AddAsync(Group group)
    {
        await _context.Groups.AddAsync(group);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}