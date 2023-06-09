import {FaAngleRight} from 'react-icons/fa'
import clsx from 'clsx'
import styles from './Header.module.scss'
type NavItemProps = {
    content : string,
    isShowHover : boolean,
    handleOnMouse : any
}
const NavItem = ({content,isShowHover ,handleOnMouse} : NavItemProps) => {
    return <div className= {clsx('flex gap-2 items-center text-sm py-2 px-4 cursor-pointer',styles.nav_item)} onMouseOver={() => handleOnMouse({itemIndex : content,isShowHover : isShowHover})}>
        <span className = 'capitalize'>{content}</span>
        <span className={clsx(styles.nav_item_left)}></span>
        {isShowHover ? <FaAngleRight/> : ''}
    </div>
}

export default NavItem;