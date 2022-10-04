import { useState } from 'react';

const dialogClasses = `max-w-fit justify-center items-center border-8 border-white p-2 rounded-lg text-center copyright`;

const Copyright = () => {
  const [visible, setVisibility] = useState(true);

  const handleClose = () => {
    setVisibility(false);
  }

  const element = (
    <div className="absolute z-[200] bg-slate-400/50 flex flex-col h-full items-center justify-center top-0 left-0 w-full">
      <div className={dialogClasses}>
        <p className="text-md mb-4">
          All assets used within this project are owned solely by&nbsp;
          <a href="http://www.monomipark.com" style={{ color: '#F742AD' }}>Monomi Park</a>.
        </p>
        <p className="text-md mb-4">This map project is for fun and to help the community.</p>
        <p className="text-md mb-4">No money is being made from this map project.</p>
        <p className="text-md mb-4">Made with ❤️ by Chooky | <a href="https://github.com/BrookJeynes/slime-rancher-2-interactive-map">Github</a></p>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );

  return visible ? element : null;
}

export default Copyright;
