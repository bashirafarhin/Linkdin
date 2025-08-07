export default function RightSidebar() {
  return (
    <div className="border border-gray-200 bg-white rounded-lg shadow p-4 space-y-4 text-sm">
      <div>
        <h2 className="font-semibold mb-2">LinkedIn News</h2>
        <ul className="space-y-1">
          <li>🚌 Karnataka bus strike begins</li>
          <li>🏦 IndusInd Bank appoints new CEO</li>
          <li>📈 GCCs to step up hiring</li>
          <li>💊 Pharma to lead pay hikes</li>
          <li>🍽 Costs eat into F&B margins</li>
        </ul>
      </div>

      <div className="border-t pt-2">
        <h2 className="font-semibold mb-2">Today&apos puzzles</h2>
        <ul>
          <li>🧩 Zip #141</li>
          <li>🧩 Tango #302</li>
          <li>🧩 Queens #462</li>
        </ul>
      </div>
    </div>
  );
}
