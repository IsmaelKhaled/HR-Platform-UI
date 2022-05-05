import React, { Component } from "react";
import AttributeGroup from "./AttributeGroup";

export default class GroupsList extends Component {
  render() {
    return (
      <>
        <div className="list-group-flush">
          {this.props.focusGroups.length > 0 && (
            <div className="list-group-item">
              <h3>Focus Groups</h3>
              {this.props.focusGroups.map((group) => (
                <AttributeGroup key={group.id} group={group} />
              ))}
            </div>
          )}
          {this.props.additionalGroups.length > 0 && (
            <div className="list-group-item">
              <h2>Additional Groups</h2>
              {this.props.additionalGroups.map((group) => (
                <AttributeGroup key={group.id} group={group} />
              ))}
            </div>
          )}
        </div>
      </>
    );
  }
}
