properties = {
  // <your other post properties>
  // .
  // .
  wcsTolerance: 0.01, // tolerance for checking WCS offsets
  wcsXShift: 0.0, // WCS X Shift for macro validation
  wcsYShift: 0.0, // WCS Y Shift for macro validation
  wcsZShift: 0.0, // WCS Z Shift for macro validation
}

propertyDefinitions = {
  // <your other post property descriptions>
  // .
  // .
  wcsTolerance: {
    title: "WCS tolerance",
    description: "Enter the tolerance for checking WCS origins",
    group: 1,
    type: "spatial",
  },
  wcsXShift: {
    title: "WCS X Offset",
    description: "WCS Shift for X to align machine model with real life",
    group: 1,
    type: "spatial",
  },
  wcsYShift: {
    title: "WCS Y Offset",
    description: "WCS Shift for Y to align machine model with real life",
    group: 1,
    type: "spatial",
  },
  wcsZShift: {
    title: "WCS Z Offset",
    description: "WCS Shift for Z to align machine model with real life",
    group: 1,
    type: "spatial",
  },
}

function toMCSPosition(section, wcsPosition) {
  var partAttachPoint = section.getPartAttachPoint();
  var tableAttachPoint = machineConfiguration.getTableAttachPoint();
  var mcsPosition = Vector.sum(
    tableAttachPoint,
    Vector.diff(wcsPosition, partAttachPoint)
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
          "X" + xyzFormat.format(mcsOrigin.x + properties.wcsXShift),
          "Y" + xyzFormat.format(mcsOrigin.y + properties.wcsYShift),
          "Z" + xyzFormat.format(mcsOrigin.z + properties.wcsZShift),
          "E" + xyzFormat.format(properties.wcsTolerance),
          "W" + wcs
        );
        checked[wcs] = true;
      }
    }
    writeComment("-----------------------");
    writeln("");
  }
}


// In the onOpen function call the verifyWCS() method. 