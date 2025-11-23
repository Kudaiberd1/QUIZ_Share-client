
import {useState, useEffect} from "react";

interface TimerProps {
    seconds: number;
    onComplete: () => void;
}

const Timer: React.FC<TimerProps> = ({seconds, onComplete}) => {
    const [count, setCount] = useState(seconds);

    useEffect(() => {
        if (count > 0) {
            const timer = setTimeout(() => setCount((prev) => prev - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            onComplete();
        }
    }, [count, onComplete]);

    return (
        <div className="">
                <span className="text-blue-700 font-bold">{Math.floor(count/60)!=0 && Math.floor(count/60)} {Math.floor(count/60)!=0 && "minute"} {count%60} second</span>
        </div>
    );
};

export default Timer;