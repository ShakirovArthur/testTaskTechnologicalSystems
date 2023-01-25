import column from './Items';
import './App.css';
import { useState } from 'react';
import good from './Goods';


function App() {
  const [dragginIndex, setDraggingIndex] = useState(null);
  const [columnsOrder, setColumnsOrder] = useState(['Название',"Артикул","Цена","Продажи","Выручка за период","Выручка","Тренд выручки","Упущенная выручка","Продавец","Бренд","Продажи за все время","Наличие","Рейтинг","Отзывов","Дата обнаружения товара"]);
  const columns = column;
  const goods = good;
  const getIndex = (event) => {
    const getParentIndex = (target) => {
      if (target.dataset.index === undefined) {
        return parseFloat(getParentIndex(target.parentElement));
      }
      return parseFloat(target.dataset.index);
    };
    return getParentIndex(event.target);
  };
  const DragStartHandle = (event) => {
    setDraggingIndex(event.target.dataset.index);
    event.target.classList.add("dragging");
  };
  const DragEndHandle = (event) => {
    event.target.classList.remove("dragging");
  };
  const onDragOverHandle = (event) => {
    event.preventDefault();
  };
  const OnDropHandle = (event) => {
    const dropIndex = getIndex(event);
    const columnsOrderCopy = [...columnsOrder];
    columnsOrderCopy.splice(dragginIndex, 1);
    columnsOrderCopy.splice(dropIndex, 0, columnsOrder[dragginIndex]);
    setColumnsOrder(columnsOrderCopy);
  };
  const formatData = (good, item) => {
    return good[item.title];
  };
  return (
    <div className="App">
      <table className='table'>
        <thead>
          <tr>
            {columns.sort((a,b) => columnsOrder.indexOf(a.title) - columnsOrder.indexOf(b.title)).map((item,index) => (
              <th
              draggable
              onDragStart={DragStartHandle}
                  onDragEnd={DragEndHandle}
                  onDragOver={onDragOverHandle}
                  onDrop={OnDropHandle}
                  key={item.title}
                  data-index={index}
              >{item.title}</th>
            ))}
          </tr>
          </thead>
          <tbody>
            {goods.map((good) => (
              <tr key={good.id}>
                {column.sort((a,b) => columnsOrder.indexOf(a.title) - columnsOrder.indexOf(b.title)).map((item) => {
                  return (
                    <td key={item.title}>{formatData(good,item)}</td>
                  )
                }) }
              </tr>
            ))}
            
          </tbody>
      </table>
    </div>
  );
}

export default App;
