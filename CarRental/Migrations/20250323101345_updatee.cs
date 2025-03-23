using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarRental.Migrations
{
    /// <inheritdoc />
    public partial class updatee : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RentalRequests_UserAccounts_Id",
                table: "RentalRequests");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "UserAccounts",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "RentalRequests",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_RentalRequests_Id",
                table: "RentalRequests",
                newName: "IX_RentalRequests_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_RentalRequests_UserAccounts_UserId",
                table: "RentalRequests",
                column: "UserId",
                principalTable: "UserAccounts",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RentalRequests_UserAccounts_UserId",
                table: "RentalRequests");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "UserAccounts",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "RentalRequests",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "IX_RentalRequests_UserId",
                table: "RentalRequests",
                newName: "IX_RentalRequests_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RentalRequests_UserAccounts_Id",
                table: "RentalRequests",
                column: "Id",
                principalTable: "UserAccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
