namespace ExpenseSplitter.Application.DTOs;

public record CreateGroupRequest(string Name, List<string> MemberNames);

public record GroupResponse(Guid Id, string Name, DateTime CreatedAt, List<MemberResponse> Members);

public record MemberResponse(Guid Id, string Name);