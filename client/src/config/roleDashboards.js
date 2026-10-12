/**
 * Content for each role's dashboard. RoleDashboard.jsx renders any of these.
 *
 * WHERE TO ADD: new file, drop it in client/src/config/.
 * All numbers are SAMPLE DATA (based on the Pump-7 test documents). To go
 * live, replace the static values with data from your API - see the note at
 * the top of components/dashboard/RoleDashboard.jsx.
 *
 * Shape:
 *   stats:   [{ label, value, hint?, tone?, icon? }]
 *   actions: [{ label, description, to?, icon?, comingSoon? }]
 *   panels:  [{ id, title, subtitle?, type: 'list'|'table'|'bars'|'access', span?: 2, ... }]
 * Tones: ok | warn | danger | info | muted.  Icons: names from dashboardTheme.js.
 * List item titles must be unique within one panel (they are used as React keys).
 */

export const technicianConfig = {
  role: 'technician',
  accent: 'teal',
  subheading: 'Ask about any machine, procedure or work order and get the answer with its source.',
  stats: [
    { label: 'Questions asked today', value: '7', hint: 'Average answer 3.2 s', tone: 'ok', icon: 'MessageSquare' },
    { label: 'Equipment looked up', value: '3', hint: 'P-07, V-104, B-02', icon: 'Wrench' },
    { label: 'Documents you can search', value: '38', hint: 'All indexed', tone: 'ok', icon: 'FileText' },
    { label: 'Safety reminders', value: '2', hint: 'Review before entry', tone: 'warn', icon: 'AlertTriangle' },
  ],
  actions: [
    { label: 'Ask FactoryIQ', description: 'Plain-language questions with cited answers.', to: '/app', icon: 'MessageSquare' },
    { label: 'Browse documents', description: 'Read-only access to manuals and procedures.', to: '/app/documents', icon: 'BookOpen' },
    { label: 'Scan equipment tag', description: 'Point your phone at a tag to open that machine\'s history.', icon: 'Search', comingSoon: true },
  ],
  panels: [
    {
      id: 'suggested',
      title: 'Questions worth asking',
      subtitle: 'Open FactoryIQ and try one',
      type: 'list',
      items: [
        { title: 'What is the bearing temperature limit for P-07?', meta: 'OEM manual CF-250, section 7.1' },
        { title: 'Which gas readings are needed before confined space entry?', meta: 'Safety procedure SP-04' },
        { title: 'When was Pump-7 last serviced?', meta: 'Maintenance report and work orders' },
        { title: 'At what leakage should the mechanical seal be replaced?', meta: 'OEM manual CF-250, section 6.2' },
      ],
    },
    {
      id: 'reminders',
      title: 'Safety reminders',
      type: 'list',
      items: [
        { title: 'Retest gas every 2 hours during confined space work', meta: 'SP-04, section 4', tag: { text: 'Required', tone: 'warn' } },
        { title: 'A confined space permit (Form F-12) is valid for 8 hours', meta: 'SP-04, section 3', tag: { text: 'Permit', tone: 'info' } },
      ],
    },
    { id: 'access', title: 'Your access', type: 'access', span: 2 },
  ],
};

export const engineerConfig = {
  role: 'engineer',
  accent: 'sky',
  subheading: 'Keep equipment records current, close knowledge gaps and spot repeat failures early.',
  stats: [
    { label: 'Documents indexed', value: '38', hint: 'Searchable now', tone: 'ok', icon: 'FileText' },
    { label: 'Processing', value: '2', hint: 'Usually under a minute', tone: 'info', icon: 'Clock' },
    { label: 'Failed uploads', value: '1', hint: 'Needs a re-upload', tone: 'danger', icon: 'AlertTriangle' },
    { label: 'Open knowledge gaps', value: '5', hint: '2 need action this week', tone: 'warn', icon: 'ClipboardList' },
  ],
  actions: [
    { label: 'Upload documents', description: 'Add manuals, work orders and inspection reports.', to: '/app/documents', icon: 'Upload' },
    { label: 'Ask FactoryIQ', description: 'Check equipment history or compare documents.', to: '/app', icon: 'MessageSquare' },
    { label: 'Review gaps', description: 'See everything FactoryIQ could not link or verify.', to: '/app/dashboard', icon: 'ClipboardCheck' },
  ],
  panels: [
    {
      id: 'gaps',
      title: 'Knowledge gaps',
      subtitle: 'Found by comparing your documents with each other',
      type: 'list',
      span: 2,
      items: [
        { title: 'P-07 preventive maintenance is overdue', meta: 'Last PM 14 Mar 2026, 6-month interval', tag: { text: 'Overdue', tone: 'danger' } },
        { title: 'Manual and plant plan disagree on lubrication interval', meta: 'OEM manual Rev 3 says 3 months, plant plan says 6', tag: { text: 'Conflict', tone: 'warn' } },
        { title: 'WO-2847 cites OEM manual Rev 5', meta: 'Only Rev 3 is uploaded', tag: { text: 'Missing', tone: 'warn' } },
        { title: 'SP-04 requires Form F-12', meta: 'The form is not in the system', tag: { text: 'Missing', tone: 'warn' } },
        { title: 'Work order WO-2910 is still open', meta: 'Boiler feed valve check, B-02', tag: { text: 'Open', tone: 'info' } },
      ],
    },
    {
      id: 'failures',
      title: 'Repeat failures',
      subtitle: 'Last 12 months',
      type: 'table',
      columns: ['Equipment', 'Failures', 'Last failure', 'Status'],
      rows: [
        ['P-07 (Pump-7)', '2', '04 Jun 2026', { text: 'Watch', tone: 'warn' }],
        ['V-104', '1', '15 Aug 2026', { text: 'OK', tone: 'ok' }],
        ['B-02', '0', 'None', { text: 'OK', tone: 'ok' }],
      ],
    },
    {
      id: 'uploads',
      title: 'Recent uploads',
      type: 'list',
      items: [
        { title: 'Work_Order_Log_2026.pdf', meta: 'Indexed', tag: { text: 'Processed', tone: 'ok' } },
        { title: 'Near_Miss_Report_NM-2026-017.pdf', meta: 'Indexed', tag: { text: 'Processed', tone: 'ok' } },
        { title: 'Boiler_B-02_Inspection_Report.pdf', meta: 'Reading text', tag: { text: 'Processing', tone: 'info' } },
        { title: 'Scan_0042.pdf', meta: 'No text could be read', tag: { text: 'Failed', tone: 'danger' } },
      ],
    },
    { id: 'access', title: 'Your access', type: 'access', span: 2 },
  ],
};

export const safetyOfficerConfig = {
  role: 'safety_officer',
  accent: 'amber',
  subheading: 'See what is overdue, what is open and where compliance evidence is thin.',
  stats: [
    { label: 'Overdue inspections', value: '1', hint: 'Boiler B-02', tone: 'danger', icon: 'AlertTriangle' },
    { label: 'Procedures past review', value: '1', hint: 'SP-04', tone: 'warn', icon: 'ScrollText' },
    { label: 'Open corrective actions', value: '2', hint: 'Both past due', tone: 'warn', icon: 'ClipboardList' },
    { label: 'Compliance coverage', value: '78%', hint: 'Across four frameworks', tone: 'info', icon: 'ShieldCheck' },
  ],
  actions: [
    { label: 'Ask FactoryIQ', description: 'Check a procedure, permit or inspection record.', to: '/app', icon: 'MessageSquare' },
    { label: 'Upload records', description: 'Add inspection reports and permits.', to: '/app/documents', icon: 'Upload' },
    { label: 'Audit evidence pack', description: 'Export the documents behind a requirement.', icon: 'ClipboardCheck', comingSoon: true },
  ],
  panels: [
    {
      id: 'coverage',
      title: 'Compliance coverage',
      subtitle: 'Share of requirements with a linked procedure or record',
      type: 'bars',
      items: [
        { label: 'Factories Act, 1948', value: 85, tone: 'ok' },
        { label: 'PESO rules', value: 72, tone: 'info' },
        { label: 'OISD standards', value: 64, tone: 'warn' },
        { label: 'Environmental norms', value: 58, tone: 'danger' },
      ],
    },
    {
      id: 'due',
      title: 'Overdue and due soon',
      type: 'list',
      items: [
        { title: 'Boiler B-02 inspection', meta: 'Was due 10 Aug 2026', tag: { text: 'Overdue', tone: 'danger' } },
        { title: 'SP-04 confined space procedure review', meta: 'Was due 01 Jan 2026', tag: { text: 'Overdue', tone: 'danger' } },
        { title: 'Form F-12 permit template', meta: 'Referenced by SP-04, not on file', tag: { text: 'Missing', tone: 'warn' } },
      ],
    },
    {
      id: 'actions-open',
      title: 'Open near-miss actions',
      type: 'table',
      span: 2,
      columns: ['Ref', 'Action', 'Owner', 'Due', 'Status'],
      rows: [
        ['NM-2026-017 #1', 'Reduce P-07 PM interval to 3 months', 'Maintenance Manager', '30 Jun 2026', { text: 'Overdue', tone: 'danger' }],
        ['NM-2026-017 #2', 'Review vibration monitoring for CF-250 pumps', 'Reliability Engineer', '31 Jul 2026', { text: 'Overdue', tone: 'danger' }],
      ],
    },
    {
      id: 'incidents',
      title: 'Recent incidents and near-misses',
      type: 'list',
      items: [
        { title: 'NM-2026-017: Pump-7 seal leak and high bearing temperature', meta: '02 Jun 2026, no injury', tag: { text: 'Near-miss', tone: 'info' } },
      ],
    },
    { id: 'access', title: 'Your access', type: 'access' },
  ],
};

export const plantManagerConfig = {
  role: 'plant_manager',
  accent: 'violet',
  subheading: 'The health of the plant\'s knowledge and the risks that need a decision.',
  stats: [
    { label: 'Questions answered (7 days)', value: '214', hint: 'Across all roles', tone: 'ok', icon: 'MessageSquare' },
    { label: 'Average answer time', value: '3.4 s', hint: 'With sources', tone: 'ok', icon: 'Clock' },
    { label: 'Documents indexed', value: '38', icon: 'FileText' },
    { label: 'Open risk items', value: '4', hint: '2 rated high', tone: 'warn', icon: 'AlertTriangle' },
  ],
  actions: [
    { label: 'Ask FactoryIQ', description: 'Ask a question about any document.', to: '/app', icon: 'MessageSquare' },
    { label: 'Weekly summary', description: 'A one-page digest of risks and usage.', icon: 'ScrollText', comingSoon: true },
  ],
  panels: [
    {
      id: 'usage',
      title: 'Questions per day',
      subtitle: 'Last 7 days, 214 in total',
      type: 'bars',
      items: [
        { label: 'Mon', value: 70, display: '32', tone: 'info' },
        { label: 'Tue', value: 87, display: '40', tone: 'info' },
        { label: 'Wed', value: 100, display: '46', tone: 'info' },
        { label: 'Thu', value: 89, display: '41', tone: 'info' },
        { label: 'Fri', value: 74, display: '34', tone: 'info' },
        { label: 'Sat', value: 30, display: '14', tone: 'info' },
        { label: 'Sun', value: 15, display: '7', tone: 'info' },
      ],
    },
    {
      id: 'risks',
      title: 'Top risks right now',
      type: 'list',
      items: [
        { title: 'P-07 repeat seal failures', meta: '2 failures in 7 months, PM interval change still open', tag: { text: 'High', tone: 'danger' } },
        { title: 'Boiler B-02 inspection overdue', meta: 'Was due 10 Aug 2026', tag: { text: 'High', tone: 'danger' } },
        { title: 'SP-04 procedure review overdue', meta: 'Was due 01 Jan 2026', tag: { text: 'Medium', tone: 'warn' } },
        { title: 'Missing forms and manual revisions', meta: 'Form F-12, OEM manual Rev 5', tag: { text: 'Medium', tone: 'warn' } },
      ],
    },
    { id: 'access', title: 'Your access', type: 'access', span: 2 },
  ],
};

export const adminConfig = {
  role: 'admin',
  accent: 'rose',
  subheading: 'Control who can sign in, what they can do, and what has happened in the system.',
  stats: [
    { label: 'Active users', value: '5', hint: '1 deactivated', icon: 'Users' },
    { label: 'Documents', value: '38', hint: 'All plants', icon: 'FileText' },
    { label: 'Failed processing', value: '1', hint: 'Needs a re-upload', tone: 'danger', icon: 'AlertTriangle' },
    { label: 'Questions (7 days)', value: '214', icon: 'MessageSquare' },
  ],
  actions: [
    { label: 'Invite a user', description: 'Backend is ready (POST /api/auth/users). The form is not built yet.', icon: 'UserPlus', comingSoon: true },
    { label: 'Manage documents', description: 'Review and delete any document.', to: '/app/documents', icon: 'FileText' },
    { label: 'Full audit log', description: 'Backend is ready (GET /api/auth/audit). The page is not built yet.', icon: 'ScrollText', comingSoon: true },
  ],
  panels: [
    {
      id: 'users',
      title: 'Users and roles',
      type: 'table',
      span: 2,
      columns: ['Name', 'Role', 'Plant', 'Status'],
      rows: [
        ['Ravi Sharma', 'Technician', 'Unit 3', { text: 'Active', tone: 'ok' }],
        ['Anita Verma', 'Engineer', 'Unit 3', { text: 'Active', tone: 'ok' }],
        ['Imran Qureshi', 'Safety officer', 'Unit 3', { text: 'Active', tone: 'ok' }],
        ['Meera Nair', 'Plant manager', 'Unit 3', { text: 'Active', tone: 'ok' }],
        ['Karan Mehta', 'Admin', 'All plants', { text: 'Active', tone: 'ok' }],
        ['Dev Patel', 'Technician', 'Unit 3', { text: 'Deactivated', tone: 'muted' }],
      ],
    },
    {
      id: 'audit',
      title: 'Recent activity',
      subtitle: 'From the audit log',
      type: 'list',
      items: [
        { title: 'Anita Verma uploaded Work_Order_Log_2026.pdf', meta: 'Today, 09:42', tag: { text: 'Upload', tone: 'info' } },
        { title: 'Ravi Sharma asked: When was Pump-7 last serviced?', meta: 'Today, 09:15', tag: { text: 'Query', tone: 'muted' } },
        { title: 'Karan Mehta signed in', meta: 'Today, 08:58', tag: { text: 'Sign-in', tone: 'muted' } },
        { title: 'Dev Patel was deactivated', meta: 'Yesterday, 17:20', tag: { text: 'Admin', tone: 'warn' } },
      ],
    },
    {
      id: 'health',
      title: 'System health',
      type: 'list',
      items: [
        { title: 'API server', tag: { text: 'Operational', tone: 'ok' } },
        { title: 'Database', tag: { text: 'Operational', tone: 'ok' } },
        { title: 'Embedding service', tag: { text: 'Operational', tone: 'ok' } },
        { title: 'Answer model', tag: { text: 'Operational', tone: 'ok' } },
      ],
    },
    { id: 'access', title: 'Your access', type: 'access', span: 2 },
  ],
};
