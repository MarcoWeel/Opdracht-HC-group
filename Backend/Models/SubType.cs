using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Opdracht_HC_group.Models
{
    public class SubType
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public Guid SubTypeId { get; set; }
        [Required]
        [StringLength(25)]
        public string Name { get; set; }
        [Required]
        [ForeignKey("MainType")]
        public Guid MainTypeId { get; set; }
    }
}
