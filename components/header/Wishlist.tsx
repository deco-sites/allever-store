import Icon from "../ui/Icon.tsx";


const Wishlist = () => {
    return (
        <>
            <a
                href="/wishlist"
                class="font-thin btn-ghost no-animation lg:-mt-[5px] p-0">
                <Icon id="wishlist-icon" />
            </a>
        </>
    )
}

export default Wishlist