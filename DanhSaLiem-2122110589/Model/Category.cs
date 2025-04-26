using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DanhSaLiem_2122110589.Model
{
    [Table("category")] // CHÍNH XÁC tên bảng trong SQL
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
