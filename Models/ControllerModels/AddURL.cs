using System.ComponentModel.DataAnnotations.Schema;

namespace InforceTestTask.Models.ControllerModels
{
    [NotMapped]
    public class AddURL
    {
        public string? Url { get; set; }
        public string? Login { get; set; }
    }
}
