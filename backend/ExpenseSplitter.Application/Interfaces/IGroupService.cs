using ExpenseSplitter.Application.DTOs;

namespace ExpenseSplitter.Application.Interfaces;

public interface IGroupService
{
    Task<GroupResponse> CreateGroupAsync(CreateGroupRequest request);
    Task<GroupResponse> GetGroupAsync(Guid groupId);
}