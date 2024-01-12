document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const colorPalette = document.getElementById('colorPalette');
    const brushSizeInput = document.getElementById('brushSize');

    // Установка начальных настроек
    let currentColor = '#000';
    let brushSize = brushSizeInput.value;

    // Создание палитры с 10 цветами
    const colors = ['#000080', '#008000', '#800080', '#00FFFF', '#FF00FF', '#FFFF00', '#0000FF', '#00FF00', '#FF0000', '#000'];

    colors.forEach(color => {
        const colorDiv = document.createElement('div');
        colorDiv.className = 'color';
        colorDiv.style.backgroundColor = color;
        colorDiv.addEventListener('click', () => {
            currentColor = color;
        });
        colorPalette.appendChild(colorDiv);
    });

    // Обработчики событий для рисования
    let isDrawing = false;

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseout', stopDrawing);

    // Настройка начальных параметров рисования
    function startDrawing(e) {
        isDrawing = true;
        draw(e); // Начать рисование сразу при клике
    }

    function stopDrawing() {
        isDrawing = false;
        context.beginPath(); // Завершить текущий путь
    }

    function draw(e) {
        if (!isDrawing) return;

        context.lineWidth = brushSize;
        context.lineCap = 'round';
        context.strokeStyle = currentColor;

        context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        context.stroke();

        context.beginPath();
        context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    // Обработчик изменения толщины кисти
    brushSizeInput.addEventListener('input', function () {
        brushSize = this.value;
    });
});