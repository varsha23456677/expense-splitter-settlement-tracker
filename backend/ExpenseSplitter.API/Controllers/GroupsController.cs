using ExpenseSplitter.Application.DTOs;
using ExpenseSplitter.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseSplitter.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GroupsController : ControllerBase
{
    private readonly IGroupService _groupService;

    public GroupsController(IGroupService groupService)
    {
        _groupService = groupService;
    }

    [HttpPost]
    public async Task<ActionResult<GroupResponse>> CreateGroup(CreateGroupRequest request)
    {
        var group = await _groupService.CreateGroupAsync(request);
        return CreatedAtAction(nameof(GetGroup), new { id = group.Id }, group);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<GroupResponse>> GetGroup(Guid id)
    {
        try
        {
            var group = await _groupService.GetGroupAsync(id);
            return Ok(group);
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }
}