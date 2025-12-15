using SQLite;
using ProveedoresApp.Models;


namespace ProveedoresApp.Services;


public class DatabaseService
{
private readonly SQLiteAsyncConnection _database;


public DatabaseService()
{
var dbPath = Path.Combine(FileSystem.AppDataDirectory, "proveedores.db3");
_database = new SQLiteAsyncConnection(dbPath);
_database.CreateTableAsync<Proveedor>().Wait();
}


public Task<List<Proveedor>> GetProveedoresAsync()
=> _database.Table<Proveedor>().ToListAsync();


public Task<int> SaveProveedorAsync(Proveedor proveedor)
{
if (proveedor.Id != 0)
return _database.UpdateAsync(proveedor);
else
return _database.InsertAsync(proveedor);
}


public Task<int> DeleteProveedorAsync(Proveedor proveedor)
=> _database.DeleteAsync(proveedor);
}