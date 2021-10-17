import {useLocation} from "react-router-dom";
import {useEffect} from "react";

export function useLocationChangeCallback(callback) {
    const {pathname} = useLocation();
    useEffect(() => {
            if (typeof callback === "function") {
                callback()
            }
        },
        [callback, pathname]
    )
}