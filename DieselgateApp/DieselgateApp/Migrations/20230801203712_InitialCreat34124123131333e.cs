using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DieselgateApp.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreat34124123131333e : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Claims",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "Claims");
        }
    }
}
