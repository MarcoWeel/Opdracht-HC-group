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
        [ForeignKey("BrandId")]
        public Brand? Brand { get; set; }
        [ForeignKey("SubTypeId")]
        public SubType? SubType { get; set; }
        public Guid BrandId { get; set; }
        public Guid SubTypeId { get; set; }
        [Required]
        public double Diameter { get; set; }
    }
}
