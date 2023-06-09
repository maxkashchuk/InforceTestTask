﻿// <auto-generated />
using System;
using InforceTestTask;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace InforceTestTask.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    [Migration("20230314144210_Initial_1")]
    partial class Initial_1
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("InforceTestTask.Models.EntityModels.URL", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("LongUrl")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ShortUrl")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("Date")
                        .IsUnique()
                        .HasFilter("[Date] IS NOT NULL");

                    b.HasIndex("LongUrl")
                        .IsUnique()
                        .HasFilter("[LongUrl] IS NOT NULL");

                    b.HasIndex("ShortUrl")
                        .IsUnique()
                        .HasFilter("[ShortUrl] IS NOT NULL");

                    b.HasIndex("UserId");

                    b.ToTable("URLs");
                });

            modelBuilder.Entity("InforceTestTask.Models.EntityModels.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Login")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("Login")
                        .IsUnique()
                        .HasFilter("[Login] IS NOT NULL");

                    b.HasIndex("Password")
                        .IsUnique()
                        .HasFilter("[Password] IS NOT NULL");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("InforceTestTask.Models.EntityModels.URL", b =>
                {
                    b.HasOne("InforceTestTask.Models.EntityModels.User", "user")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("user");
                });
#pragma warning restore 612, 618
        }
    }
}
