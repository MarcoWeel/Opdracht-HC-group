using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Opdracht_HC_group.Models
{
    public class Filament
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public Guid FilamentId { get; set; }
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        [Required]
        [ForeignKey("BrandId")]
        public Guid BrandId { get; set; }
        [Required]
        [ForeignKey("MainTypeId")]
        public Guid MainTypeGuid { get; set; }
        [Required]
        public double Diameter { get; set; }
    }
}
