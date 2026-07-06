import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import "./Dropdown.css";

interface DropdownProps<T extends string> {
    value: T | "All";
    options: readonly T[];
    allLabel: string;
    onChange: (value: T | "All") => void;
}

function Dropdown<T extends string>({ value, options, allLabel, onChange }: DropdownProps<T>) {
    const [open, setOpen] = useState(false);
    const [highlight, setHighlight] = useState(0);
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);

    const allOptions: (T | "All")[] = ["All", ...options];

    const updateCoords = () => {
        const rect = triggerRef.current?.getBoundingClientRect();
        if (rect) {
            setCoords({ top: rect.bottom + 6, left: rect.left, width: rect.width });
        }
    };

    useLayoutEffect(() => {
        if (open) updateCoords();
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const handleClick = (e: MouseEvent) => {
            if (
                triggerRef.current && !triggerRef.current.contains(e.target as Node) &&
                menuRef.current && !menuRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };
        const handleScrollOrResize = () => updateCoords();

        document.addEventListener("mousedown", handleClick);
        window.addEventListener("scroll", handleScrollOrResize, true);
        window.addEventListener("resize", handleScrollOrResize);
        return () => {
            document.removeEventListener("mousedown", handleClick);
            window.removeEventListener("scroll", handleScrollOrResize, true);
            window.removeEventListener("resize", handleScrollOrResize);
        };
    }, [open]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!open) setOpen(true);
            else {
                onChange(allOptions[highlight]);
                setOpen(false);
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            setHighlight((h) => Math.min(h + 1, allOptions.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlight((h) => Math.max(h - 1, 0));
        } else if (e.key === "Escape") {
            setOpen(false);
        }
    };

    return (
        <div className="custom-dropdown">
            <button
                type="button"
                ref={triggerRef}
                className={`custom-dropdown-trigger${open ? " open" : ""}`}
                onClick={() => setOpen((o) => !o)}
                onKeyDown={handleKeyDown}
            >
                <span>{value === "All" ? allLabel : value}</span>
                <svg className="custom-dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {open && createPortal(
                <ul
                    ref={menuRef}
                    className="custom-dropdown-menu"
                    role="listbox"
                    style={{ top: coords.top, left: coords.left, minWidth: coords.width }}
                >
                    {allOptions.map((opt, i) => (
                        <li
                            key={opt}
                            role="option"
                            aria-selected={opt === value}
                            className={`custom-dropdown-option${opt === value ? " selected" : ""}${i === highlight ? " highlighted" : ""}`}
                            onMouseEnter={() => setHighlight(i)}
                            onClick={() => {
                                onChange(opt);
                                setOpen(false);
                            }}
                        >
                            {opt === "All" ? allLabel : opt}
                        </li>
                    ))}
                </ul>,
                document.body
            )}
        </div>
    );
}

export default Dropdown;