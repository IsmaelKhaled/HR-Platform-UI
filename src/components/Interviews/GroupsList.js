import React from "react";
import AttributeGroup from "./AttributeGroup";

export default function GroupsList(props) {
  return (
    <div className="list-group-flush">
      {props.focusGroups.length > 0 && (
        <div className="list-group-item">
          <h3>Focus Groups</h3>
          {props.focusGroups.map((group) => (
            <AttributeGroup key={group.id} group={group} />
          ))}
        </div>
      )}
      {props.additionalGroups.length > 0 && (
        <div className="list-group-item">
          <h2>Additional Groups</h2>
          {props.additionalGroups.map((group) => (
            <AttributeGroup key={group.id} group={group} />
          ))}
        </div>
      )}
    </div>
  );
}
