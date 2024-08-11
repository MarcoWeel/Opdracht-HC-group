using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Opdracht_HC_group.Data;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<Opdracht_HC_groupContext>();
//options => options.UseSqlServer(builder.Configuration.GetConnectionString("Opdracht_HC_groupContext") ?? throw new InvalidOperationException("Connection string 'Opdracht_HC_groupContext' not found.")));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true) // allow any origin
    .AllowCredentials());

//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
