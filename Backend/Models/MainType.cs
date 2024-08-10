using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Opdracht_HC_group.Models
{
    public class MainType
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid MainTypeId { get; set; }

        [Required]
        [StringLength(25)]
        public string Name { get; set; }
    }
}
