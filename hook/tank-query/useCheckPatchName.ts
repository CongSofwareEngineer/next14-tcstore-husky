import { useEffect, useLayoutEffect } from 'react'
import useUserData from '../useUserData'
import { usePathname } from 'next/navigation'
import useModalDrawer from '../useModalDrawer'
import {
  LIST_PAGE_NO_FOOTER,
  LIST_PAGE_REQUIRE_LOGIN,
  OBSERVER_KEY,
} from '@/constant/app'
import ObserverService from '@/services/observer'

const useCheckPatchName = () => {
  const { isLogin } = useUserData()
  const patchName = usePathname()
  const { closeModalDrawer } = useModalDrawer()

  useEffect(() => {
    if (!isLogin) {
      if (LIST_PAGE_REQUIRE_LOGIN.includes(patchName)) {
        ObserverService.emit(OBSERVER_KEY.LogOut)
      }
    } else {
      switch (patchName) {
        case '/register':
          ObserverService.emit(OBSERVER_KEY.LogOut)
          break
      }
    }

    const footer = window.document.getElementsByClassName('footer-web')[0]
    if (
      patchName.includes('/admin') ||
      patchName.includes('/my-page') ||
      LIST_PAGE_NO_FOOTER.includes(patchName)
    ) {
      if (footer) {
        footer.classList.add('no-display')
      }
    } else {
      if (footer) {
        footer.classList.remove('no-display')
      }
    }
    closeModalDrawer()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, patchName])
}

export default useCheckPatchName
