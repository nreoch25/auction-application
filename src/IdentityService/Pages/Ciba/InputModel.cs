namespace IdentityService.Pages.Ciba;

public class InputModel
{
    public string Button { get; set; } = string.Empty;
    public IEnumerable<string> ScopesConsented { get; set; } = new List<string>();
    public string Id { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}
