namespace IdentityService.Pages.Device;

public class InputModel
{
    public string Button { get; set; } = string.Empty;
    public IEnumerable<string> ScopesConsented { get; set; } = new List<string>();
    public bool RememberConsent { get; set; } = true;
    public string ReturnUrl { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string UserCode { get; set; } = string.Empty;
}
