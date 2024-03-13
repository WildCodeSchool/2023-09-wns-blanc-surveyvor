import { IconName } from "@/types/IconName.type";

type ColorType = "primary" | "success" | "error" | "warning" | "current";

type IconType = {
    name: IconName;
    box: number;
    box2?: number;
    path: string;
};

export default function Icon({
    name,
    color = "current",
    height,
    width,
}: {
    name: IconName;
    color?: ColorType;
    height?: string;
    width?: string;
}) {
    const icons: IconType[] = [
        {
            name: "plus",
            box: 20,
            path: `<g clip-path="url(#clip0_1801_27032)"><path d="M19.1667 9.16668H10.8333V0.83332C10.8333 0.373086 10.4602 0 10 0C9.53977 0 9.16668 0.373086 9.16668 0.83332V9.16664H0.83332C0.373086 9.16668 0 9.53977 0 10C0 10.4602 0.373086 10.8333 0.83332 10.8333H9.16664V19.1666C9.16664 19.6269 9.53973 20 9.99996 20C10.4602 20 10.8333 19.6269 10.8333 19.1666V10.8333H19.1666C19.6268 10.8333 19.9999 10.4602 19.9999 10C20 9.53977 19.6269 9.16668 19.1667 9.16668Z"/></g><defs><clipPath id="clip0_1801_27032"><rect width="20" height="20"/></clipPath></defs>`,
        },
        {
            name: "user",
            box: 20,
            path: `<g clip-path="url(#clip0_1801_27097)"><path d="M10 10C10.9889 10 11.9556 9.70676 12.7779 9.15735C13.6001 8.60794 14.241 7.82705 14.6194 6.91342C14.9978 5.99979 15.0969 4.99446 14.9039 4.02455C14.711 3.05465 14.2348 2.16373 13.5355 1.46447C12.8363 0.765206 11.9454 0.289002 10.9755 0.0960758C10.0055 -0.0968503 9.00021 0.00216643 8.08658 0.380605C7.17295 0.759043 6.39206 1.39991 5.84265 2.22215C5.29324 3.0444 5 4.0111 5 5C5.00132 6.32568 5.52853 7.59668 6.46593 8.53407C7.40332 9.47147 8.67432 9.99868 10 10ZM10 1.66667C10.6593 1.66667 11.3037 1.86217 11.8519 2.22844C12.4001 2.59471 12.8273 3.1153 13.0796 3.72439C13.3319 4.33348 13.3979 5.0037 13.2693 5.6503C13.1407 6.29691 12.8232 6.89085 12.357 7.35703C11.8908 7.8232 11.2969 8.14067 10.6503 8.26929C10.0037 8.3979 9.33348 8.33189 8.72439 8.0796C8.1153 7.82731 7.59471 7.40007 7.22843 6.8519C6.86216 6.30374 6.66667 5.65927 6.66667 5C6.66667 4.11595 7.01786 3.2681 7.64298 2.64298C8.2681 2.01786 9.11594 1.66667 10 1.66667ZM10 11.6667C8.01155 11.6689 6.10518 12.4598 4.69914 13.8658C3.29309 15.2718 2.50221 17.1782 2.5 19.1667C2.5 19.3877 2.5878 19.5996 2.74408 19.7559C2.90036 19.9122 3.11232 20 3.33333 20C3.55435 20 3.76631 19.9122 3.92259 19.7559C4.07887 19.5996 4.16667 19.3877 4.16667 19.1667C4.16667 17.6196 4.78125 16.1358 5.87521 15.0419C6.96917 13.9479 8.4529 13.3333 10 13.3333C11.5471 13.3333 13.0308 13.9479 14.1248 15.0419C15.2188 16.1358 15.8333 17.6196 15.8333 19.1667C15.8333 19.3877 15.9211 19.5996 16.0774 19.7559C16.2337 19.9122 16.4457 20 16.6667 20C16.8877 20 17.0996 19.9122 17.2559 19.7559C17.4122 19.5996 17.5 19.3877 17.5 19.1667C17.4978 17.1782 16.7069 15.2718 15.3009 13.8658C13.8948 12.4598 11.9884 11.6689 10 11.6667Z"/></g><defs><clipPath id="clip0_1801_27097"><rect width="20" height="20"/></clipPath></defs>`,
        },
        {
            name: "lock",
            box: 20,
            path: `<g clip-path="url(#clip0_1801_27410)"><path d="M15.8333 7.02006V5.83339C15.8333 4.2863 15.2188 2.80257 14.1248 1.7086C13.0308 0.614643 11.5471 6.10352e-05 10 6.10352e-05C8.45291 6.10352e-05 6.96918 0.614643 5.87522 1.7086C4.78125 2.80257 4.16667 4.2863 4.16667 5.83339V7.02006C3.42447 7.34398 2.79275 7.87716 2.34875 8.5544C1.90476 9.23164 1.66774 10.0236 1.66667 10.8334V15.8334C1.66799 16.9381 2.10741 17.9971 2.88852 18.7782C3.66964 19.5593 4.72868 19.9987 5.83334 20.0001H14.1667C15.2713 19.9987 16.3304 19.5593 17.1115 18.7782C17.8926 17.9971 18.332 16.9381 18.3333 15.8334V10.8334C18.3323 10.0236 18.0953 9.23164 17.6513 8.5544C17.2073 7.87716 16.5755 7.34398 15.8333 7.02006ZM5.83334 5.83339C5.83334 4.72833 6.27233 3.66852 7.05373 2.88712C7.83513 2.10571 8.89494 1.66673 10 1.66673C11.1051 1.66673 12.1649 2.10571 12.9463 2.88712C13.7277 3.66852 14.1667 4.72833 14.1667 5.83339V6.66673H5.83334V5.83339ZM16.6667 15.8334C16.6667 16.4964 16.4033 17.1323 15.9344 17.6012C15.4656 18.07 14.8297 18.3334 14.1667 18.3334H5.83334C5.1703 18.3334 4.53441 18.07 4.06557 17.6012C3.59673 17.1323 3.33334 16.4964 3.33334 15.8334V10.8334C3.33334 10.1704 3.59673 9.53447 4.06557 9.06563C4.53441 8.59679 5.1703 8.33339 5.83334 8.33339H14.1667C14.8297 8.33339 15.4656 8.59679 15.9344 9.06563C16.4033 9.53447 16.6667 10.1704 16.6667 10.8334V15.8334Z"/><path d="M10 11.6667C9.77899 11.6667 9.56703 11.7545 9.41075 11.9108C9.25447 12.0671 9.16667 12.279 9.16667 12.5001V14.1667C9.16667 14.3877 9.25447 14.5997 9.41075 14.756C9.56703 14.9123 9.77899 15.0001 10 15.0001C10.221 15.0001 10.433 14.9123 10.5893 14.756C10.7455 14.5997 10.8333 14.3877 10.8333 14.1667V12.5001C10.8333 12.279 10.7455 12.0671 10.5893 11.9108C10.433 11.7545 10.221 11.6667 10 11.6667Z"/></g><defs><clipPath id="clip0_1801_27410"><rect width="20" height="20"/></clipPath></defs>`,
        },
        {
            name: "unlock",
            box: 20,
            path: `<g clip-path="url(#clip0_1813_32024)"><path d="M14.1667 6.66672H5.83334V5.83339C5.83308 4.90956 6.13986 4.01184 6.70544 3.28137C7.27101 2.5509 8.06332 2.0291 8.95778 1.79802C9.85224 1.56694 10.7981 1.63967 11.6468 2.00479C12.4954 2.36991 13.1986 3.0067 13.6458 3.81506C13.699 3.91076 13.7704 3.99506 13.8561 4.06314C13.9418 4.13122 14.0401 4.18176 14.1454 4.21186C14.2506 4.24196 14.3607 4.25104 14.4695 4.23858C14.5782 4.22611 14.6835 4.19235 14.7792 4.13922C14.8749 4.08609 14.9592 4.01463 15.0273 3.92892C15.0953 3.84321 15.1459 3.74493 15.176 3.63969C15.2061 3.53445 15.2152 3.42431 15.2027 3.31557C15.1902 3.20682 15.1565 3.10159 15.1033 3.00589C14.4769 1.87448 13.4923 0.983322 12.3042 0.472483C11.1161 -0.0383547 9.79198 -0.139903 8.5399 0.183802C7.28782 0.507506 6.17881 1.23811 5.38719 2.26076C4.59558 3.28342 4.16624 4.54014 4.16667 5.83339V7.02006C3.42447 7.34398 2.79275 7.87716 2.34875 8.5544C1.90476 9.23164 1.66774 10.0236 1.66667 10.8334V15.8334C1.66799 16.9381 2.10741 17.9971 2.88852 18.7782C3.66964 19.5593 4.72868 19.9987 5.83334 20.0001H14.1667C15.2713 19.9987 16.3304 19.5593 17.1115 18.7782C17.8926 17.9971 18.332 16.9381 18.3333 15.8334V10.8334C18.332 9.72873 17.8926 8.66969 17.1115 7.88857C16.3304 7.10746 15.2713 6.66805 14.1667 6.66672ZM16.6667 15.8334C16.6667 16.4964 16.4033 17.1323 15.9344 17.6012C15.4656 18.07 14.8297 18.3334 14.1667 18.3334H5.83334C5.1703 18.3334 4.53441 18.07 4.06557 17.6012C3.59673 17.1323 3.33334 16.4964 3.33334 15.8334V10.8334C3.33334 10.1703 3.59673 9.53446 4.06557 9.06562C4.53441 8.59678 5.1703 8.33339 5.83334 8.33339H14.1667C14.8297 8.33339 15.4656 8.59678 15.9344 9.06562C16.4033 9.53446 16.6667 10.1703 16.6667 10.8334V15.8334Z"/><path d="M10 11.6667C9.77899 11.6667 9.56703 11.7545 9.41075 11.9108C9.25447 12.0671 9.16667 12.279 9.16667 12.5001V14.1667C9.16667 14.3877 9.25447 14.5997 9.41075 14.756C9.56703 14.9123 9.77899 15.0001 10 15.0001C10.221 15.0001 10.433 14.9123 10.5893 14.756C10.7455 14.5997 10.8333 14.3877 10.8333 14.1667V12.5001C10.8333 12.279 10.7455 12.0671 10.5893 11.9108C10.433 11.7545 10.221 11.6667 10 11.6667Z"/></g><defs><clipPath id="clip0_1813_32024"><rect width="20" height="20"/></clipPath></defs>`,
        },
    ];

    const currentIcon = icons.find((icon) => icon.name === name);

    return (
        <i>
            <svg
                width={width ?? undefined}
                height={height ?? undefined}
                viewBox={`0 0 ${currentIcon?.box} ${
                    currentIcon?.box2 || currentIcon?.box
                } `}
                className={`icon--${color}`}
                fill="none"
                dangerouslySetInnerHTML={{ __html: currentIcon?.path ?? "" }}
            />
        </i>
    );
}
