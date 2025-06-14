groupDefinitions = {
  toolPath: { title: "Toolpath WCS Check", order: 0, collapsed: false },
};
// tolerance for checking WCS offsets
properties.wcsTolerance = {
  title: "WCS tolerance",
  description: "Enter the tolerance for checking WCS origins",
  group: "toolPath",
  value: 0.01,
  type: "spatial",
  scope: "post",
};

// WCS X Shift for macro validation
properties.wcsXShift = {
  title: "WCS X Offset",
  description: "WCS Shift for X to align machine model with real life",
  group: "toolPath",
  value: 0.0,
  type: "spatial",
  scope: "post",
};

// WCS X Shift for macro validation
properties.wcsYShift = {
  title: "WCS Y Offset",
  description: "WCS Shift for Y to align machine model with real life",
  group: "toolPath",
  value: 0.0,
  type: "spatial",
  scope: "post",
};

// WCS X Shift for macro validation
properties.wcsZShift = {
  title: "WCS Z Offset",
  description: "WCS Shift for Z to align machine model with real life",
  group: "toolPath",
  value: 0.0,
  type: "spatial",
  scope: "post",
};

function toMCSPosition(section, wcsPosition) {
  var partAttachPoint = section.getPartAttachPoint();
  var tableAttachPoint = machineConfiguration.getTableAttachPoint();
  var mcsPosition = Vector.sum(
    tableAttachPoint,
    Vector.diff(wcsPosition, partAttachPoint),
  );
  return mcsPosition;
}

function verifyWCS() {
  if (machineConfiguration.isReceived()) {
    var checked = [];
    writeComment("-----------------------");
    writeComment("   Verify WCS Positions");
    for (i = 0; i < getNumberOfSections(); ++i) {
      var section = getSection(i);
      var wcs = section.workOffset;
      wcs = wcs == 0 ? 1 : wcs;
      wcs = wcs > 6 ? -(wcs - 6) : wcs + 53;
      if (typeof checked[wcs] == "undefined") {
        mcsOrigin = toMCSPosition(section, new Vector(0, 0, 0));
        writeBlock(
          gFormat.format(65),
          "P" + 8901,
          "X" + xyzFormat.format(mcsOrigin.x + getProperty("wcsXShift", 0)),
          "Y" + xyzFormat.format(mcsOrigin.y + getProperty("wcsYShift", 0)),
          "Z" + xyzFormat.format(mcsOrigin.z + getProperty("wcsZShift", 0)),
          "E" + xyzFormat.format(getProperty("wcsTolerance", 0.01)),
          "W" + wcs,
        );
        checked[wcs] = true;
      }
    }
    writeComment("-----------------------");
    writeln("");
  }
}

// In the onOpen function call the verifyWCS() method.

