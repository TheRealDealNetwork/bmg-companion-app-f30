//#region node_modules/.nitro/vite/services/ssr/assets/types-D1bYXzt9.js
var BOARD_DEPTS = [
	"Marketing",
	"Appointment Center",
	"Sales",
	"Production",
	"Accounting"
];
var EXTRA_DEPTS = [
	"Recruiting",
	"Owner",
	"General Manager"
];
var ALL_DEPTS = [...BOARD_DEPTS, ...EXTRA_DEPTS];
/** Roles a GM can assign today. Recruiting and Owner stay in the data for a later game. */
var SEAT_DEPTS = [...BOARD_DEPTS, "General Manager"];
/** Between rounds, heads are called in this order. */
var BOARD_CUE = ["General Manager", ...BOARD_DEPTS];
var DEPT_SHORT = {
	Marketing: "Marketing",
	"Appointment Center": "Appointments",
	Sales: "Sales",
	Production: "Production",
	Accounting: "Accounting",
	Recruiting: "Recruiting",
	Owner: "Owner",
	"General Manager": "GM"
};
var PHASES = [
	{
		n: 1,
		label: "Event"
	},
	{
		n: 2,
		label: "Board & P&P"
	},
	{
		n: 3,
		label: "Projects"
	},
	{
		n: 4,
		label: "Draw & play"
	},
	{
		n: 5,
		label: "Payroll"
	}
];
var SURVEY = [
	{
		key: "department_interdependence",
		prompt: "How well do you understand how the departments of a contracting business work together?"
	},
	{
		key: "leadership_role_clarity",
		prompt: "How clearly can you see yourself in a management or ownership role in the trades?"
	},
	{
		key: "principle_profit_alignment",
		prompt: "How much do you believe doing the right thing is also the most profitable thing in business?"
	}
];
var SHOUT_PRINCIPLES = [
	"Define Reality First",
	"Do Right When It Costs You",
	"Expectations Before Accountability",
	"Brilliant on the Basics",
	"Give Away the Credit, Take the Blame",
	"How We Do Anything Is How We Do Everything",
	"Serve the Human, Not the House",
	"Love Is the Greatest Leadership Tool",
	"Know Your Numbers",
	"Character Over Skill",
	"The Business Serves Its Owner",
	"Never Pre-Judge"
];
var NEXT_ROLES = [...SEAT_DEPTS];
function isDept(value) {
	return ALL_DEPTS.includes(value);
}
function principleOf(hostNote) {
	const match = /^Principle:\s*([^.]+)/.exec(hostNote.trim());
	return match ? match[1].trim() : "The principle";
}
//#endregion
export { NEXT_ROLES as a, SHOUT_PRINCIPLES as c, principleOf as d, DEPT_SHORT as i, SURVEY as l, BOARD_CUE as n, PHASES as o, BOARD_DEPTS as r, SEAT_DEPTS as s, ALL_DEPTS as t, isDept as u };
