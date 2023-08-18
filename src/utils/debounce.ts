type DebounceFunction<T extends any[]> = (func: (...args: T) => void, delay: number) => (...args: T) => void;

const debounce: DebounceFunction<any> = (func, delay) => {
    let timeoutId: ReturnType<typeof setTimeout>;

    return (...args) => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            // @ts-ignore
            func.apply(this, args);
        }, delay);
    };
};

export default  debounce
