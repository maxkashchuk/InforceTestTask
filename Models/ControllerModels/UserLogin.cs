using System.ComponentModel.DataAnnotations.Schema;

namespace InforceTestTask.Models.ControllerModels
{
    [NotMapped]
    public class UserLogin
    {
        public string? Login { get; set; }
        public string? Password { get; set; }
    }
}
