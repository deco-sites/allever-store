import { useState, useEffect } from "preact/hooks";
import { itemCount } from "./Minicart.tsx";


const CountItems = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(itemCount);
    }, [itemCount]);

    return (
        <div>
            {`[${count} ${count >= 2 ? "Produtos" : "Produto"}]`}
        </div>
    );
}

export default CountItems;
