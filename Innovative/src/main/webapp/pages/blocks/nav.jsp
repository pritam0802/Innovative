<!-- list -->
<ul class="nav">
  <li class="hidden-folded padder m-t m-b-sm text-muted text-xs">
    <span translate="aside.nav.HEADER">Navigation</span>
  </li>
  <li>
    <a href class="auto">      
      <span class="pull-right text-muted">
        <i class="fa fa-fw fa-angle-right text"></i>
        <i class="fa fa-fw fa-angle-down text-active"></i>
      </span>
      <i class="glyphicon glyphicon-stats icon text-primary-dker"></i>
      <span class="font-bold" translate="aside.nav.DASHBOARD">Dashboard</span>
    </a>
    <ul class="nav nav-sub dk">
      <li class="nav-sub-header">
        <a href>
          <span translate="aside.nav.DASHBOARD">Dashboard</span>
        </a>
      </li>
      <li ui-sref-active="active">
        <a ui-sref="app.dashboard-v1">
          <span>Dashboard v1</span>
        </a>
      </li>
      <li ui-sref-active="active">
        <a ui-sref="app.dashboard-v2">
          <b class="label bg-info pull-right">N</b>
          <span>Dashboard v2</span>
        </a>
      </li>
    </ul>
  </li>
  <li ui-sref-active="active">
    <a ui-sref="app.createQuote">
      <i class="glyphicon glyphicon-calendar icon text-info-dker"></i>
      <span class="font-bold" translate="aside.nav.NEWQUOTE">New Quote</span>
    </a>
  </li>
  <li ui-sref-active="active">
    <a ui-sref="app.existingQuotes">
      <i class="glyphicon glyphicon-calendar icon text-info-dker"></i>
      <span class="font-bold" translate="aside.nav.EXISTINGQUOTES">Existing Quotes</span>
    </a>
  </li>
  <li ui-sref-active="active">
    <a ui-sref="app.pricingChange">
      <i class="glyphicon glyphicon-calendar icon text-info-dker"></i>
      <span class="font-bold" translate="aside.nav.PRICINGCHANGE">Pricing Change</span>
    </a>
  </li>
  
</ul>
<!-- / list -->
