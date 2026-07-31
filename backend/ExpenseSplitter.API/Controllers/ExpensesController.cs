using ExpenseSplitter.Application.DTOs;
using ExpenseSplitter.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseSplitter.API.Controllers;

[ApiController]
[Route("api/groups/{groupId}/expenses")]
public class ExpensesController : ControllerBase
{
    private readonly IExpenseService _expenseService;

    public ExpensesController(IExpenseService expenseService)
    {
        _expenseService = expenseService;
    }

    [HttpPost]
    public async Task<ActionResult<ExpenseResponse>> AddExpense(Guid groupId, CreateExpenseRequest request)
    {
        var expense = await _expenseService.AddExpenseAsync(groupId, request);
        return Ok(expense);
    }

    [HttpGet("balances")]
    public async Task<ActionResult<List<BalanceResponse>>> GetBalances(Guid groupId)
    {
        try
        {
            var balances = await _expenseService.GetBalancesAsync(groupId);
            return Ok(balances);
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpGet("settlements")]
    public async Task<ActionResult<List<SettlementResponse>>> GetSettlements(Guid groupId)
    {
        try
        {
            var settlements = await _expenseService.GetSettlementsAsync(groupId);
            return Ok(settlements);
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }
}