import { AnimatePresence } from 'framer-motion'
import useStore from '../store/useStore'
import Window from './Window'
import MyComputer from '../apps/MyComputer'
import MyProjects from '../apps/MyProjects'
import AboutMe from '../apps/AboutMe'
import RecycleBin from '../apps/RecycleBin'
import MyDocuments from '../apps/MyDocuments'
import Notepad from '../apps/Notepad'
import RunDialog from '../apps/RunDialog'
import ContactMe from '../apps/ContactMe'
import PdfViewer from '../apps/PdfViewer'

const appComponents = {
  'my-computer': <MyComputer />,
  'my-projects': <MyProjects />,
  'about-me': <AboutMe />,
  'recycle-bin': <RecycleBin />,
  'my-documents': <MyDocuments />,
  'notepad': <Notepad />,
  'run-dialog': <RunDialog />,
  'contact-me': <ContactMe />,
  'resume-pdf': <PdfViewer />,
}

export default function WindowManager() {
  const windows = useStore((s) => s.windows)

  return (
    <div className="absolute inset-0 pointer-events-none">
      <AnimatePresence>
        {windows.map((win) => (
          <div key={win.id} className="pointer-events-auto">
            <Window
              window={{
                ...win,
                component: appComponents[win.component] || <div className="p-4">Unknown application</div>,
              }}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}
