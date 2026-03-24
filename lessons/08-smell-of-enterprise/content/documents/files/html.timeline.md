# HTML Timeline

```json
[
  {
    "from": "empty_shell",
    "target": "root",
    "lines": [
      "<div class=\"app-shell\">",
      "  @@slot:app-shell-content@@",
      "</div>"
    ]
  },
  {
    "from": "component_html",
    "target": "app-shell-content",
    "lines": [
      "  <ui-pricing-card",
      "    tier=\"pro\"",
      "    price-monthly=\"29\"",
      "    price-yearly=\"290\"",
      "    @@slot:pricing-card-attributes@@",
      "  >",
      "    @@slot:pricing-card-content@@",
      "  </ui-pricing-card>"
    ]
  },
  {
    "from": "popular_attribute_html",
    "target": "pricing-card-attributes",
    "lines": [
      "    popular"
    ]
  },
  {
    "from": "cta_label_attribute_html",
    "target": "pricing-card-attributes",
    "lines": [
      "    cta-label=\"Start free trial\""
    ]
  },
  {
    "from": "badge_slot_html",
    "target": "pricing-card-content",
    "lines": [
      "    <span slot=\"badge\">⭐ Most Popular</span>"
    ]
  },
  {
    "from": "features_slot_html",
    "target": "pricing-card-content",
    "lines": [
      "    <ul slot=\"features\">",
      "      <li>Unlimited projects</li>",
      "      <li>Priority support</li>",
      "      <li>Advanced analytics</li>",
      "      <li>Team collaboration</li>",
      "      <li>Custom integrations</li>",
      "    </ul>"
    ]
  }
]
```
