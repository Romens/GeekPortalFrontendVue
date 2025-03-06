import L from 'leaflet';
// Указываем правильный путь к иконкам маркеров
const iconUrl = '/markers/marker-icon-blue.png';
const iconRetinaUrl = '/markers/marker-icon-2x-blue.png';
const shadowUrl = '/markers/marker-shadow.png';
// Настраиваем иконки маркеров
const defaultIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41], // Размер иконки
    iconAnchor: [12, 41], // Точка привязки иконки
    popupAnchor: [1, -34], // Точка привязки всплывающего окна
    shadowSize: [41, 41], // Размер тени
});
// Устанавливаем иконку по умолчанию для всех маркеров
L.Marker.prototype.options.icon = defaultIcon;
export default L;
//# sourceMappingURL=leafletFix.js.map