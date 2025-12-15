using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using ProveedoresApp.Models;
using ProveedoresApp.Services;
using System.Collections.ObjectModel;


namespace ProveedoresApp.ViewModels;


public partial class ProveedorViewModel : ObservableObject
{
private readonly DatabaseService _databaseService;


public ObservableCollection<Proveedor> Proveedores { get; set; } = new();


[ObservableProperty]
private Proveedor proveedorActual = new();


public ProveedorViewModel()
{
_databaseService = new DatabaseService();
CargarProveedores();
}


[RelayCommand]
async Task CargarProveedores()
{
Proveedores.Clear();
var lista = await _databaseService.GetProveedoresAsync();
foreach (var item in lista)
Proveedores.Add(item);
}


[RelayCommand]
async Task GuardarProveedor()
{
if (string.IsNullOrWhiteSpace(ProveedorActual.Nombre))
return;


await _databaseService.SaveProveedorAsync(ProveedorActual);
ProveedorActual = new Proveedor();
await CargarProveedores();
}


[RelayCommand]
void SeleccionarProveedor(Proveedor proveedor)
{
if (proveedor != null)
ProveedorActual = proveedor;
}


[RelayCommand]
async Task EliminarProveedor(Proveedor proveedor)
{
await _databaseService.DeleteProveedorAsync(proveedor);
await CargarProveedores();
}
}