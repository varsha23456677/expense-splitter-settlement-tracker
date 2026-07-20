namespace ExpenseSplitter.Application.DTOs;

public record CreateExpenseRequest(
    string Description,
    decimal Amount,
    Guid PaidByMemberId,
    List<Guid> SplitBetweenMemberIds);

public record ExpenseResponse(
    Guid Id,
    string Description,
    decimal Amount,
    Guid PaidByMemberId,
    DateTime CreatedAt);

public record BalanceResponse(Guid MemberId, string MemberName, decimal NetBalance);

public record SettlementResponse(Guid FromMemberId, string FromMemberName, Guid ToMemberId, string ToMemberName, decimal Amount);