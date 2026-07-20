using ExpenseSplitter.Application.DTOs;
using ExpenseSplitter.Application.Interfaces;
using ExpenseSplitter.Domain.Entities;
using ExpenseSplitter.Domain.Interfaces;

namespace ExpenseSplitter.Application.Services;

public class GroupService : IGroupService
{
    private readonly IGroupRepository _groupRepository;

    public GroupService(IGroupRepository groupRepository)
    {
        _groupRepository = groupRepository;
    }

    public async Task<GroupResponse> CreateGroupAsync(CreateGroupRequest request)
    {
        var group = new Group(request.Name);

        foreach (var memberName in request.MemberNames)
            group.AddMember(new Member(memberName, group.Id));

        await _groupRepository.AddAsync(group);
        await _groupRepository.SaveChangesAsync();

        return MapToResponse(group);
    }

    public async Task<GroupResponse> GetGroupAsync(Guid groupId)
    {
        var group = await _groupRepository.GetByIdWithDetailsAsync(groupId)
            ?? throw new KeyNotFoundException("Group not found.");

        return MapToResponse(group);
    }

    private static GroupResponse MapToResponse(Group group)
    {
        return new GroupResponse(
            group.Id,
            group.Name,
            group.CreatedAt,
            group.Members.Select(m => new MemberResponse(m.Id, m.Name)).ToList());
    }
}