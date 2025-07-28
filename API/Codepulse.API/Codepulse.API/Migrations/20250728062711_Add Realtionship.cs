using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Codepulse.API.Migrations
{
    /// <inheritdoc />
    public partial class AddRealtionship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BlogPostCatogrey",
                columns: table => new
                {
                    BlogPostsID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CetagoriesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BlogPostCatogrey", x => new { x.BlogPostsID, x.CetagoriesId });
                    table.ForeignKey(
                        name: "FK_BlogPostCatogrey_BlogPosts_BlogPostsID",
                        column: x => x.BlogPostsID,
                        principalTable: "BlogPosts",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BlogPostCatogrey_Categories_CetagoriesId",
                        column: x => x.CetagoriesId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BlogPostCatogrey_CetagoriesId",
                table: "BlogPostCatogrey",
                column: "CetagoriesId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BlogPostCatogrey");
        }
    }
}
